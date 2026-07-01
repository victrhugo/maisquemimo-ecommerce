import api from '@/services/api';

interface UploadResponse {
  urls?: string[];
  data?: { urls?: string[] };
}

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Falha ao processar imagem'));
    reader.readAsDataURL(file);
  });
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const imageFiles = files.filter((file) => file.type.startsWith('image/'));
  if (imageFiles.length === 0) {
    return [];
  }

  // Prepared for backend upload API. If unavailable, fallback to data URL to keep UX functional.
  try {
    const formData = new FormData();
    imageFiles.forEach((file) => formData.append('files', file));

    const response = await api.post<UploadResponse>('/admin/uploads/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const urls = response.data.urls ?? response.data.data?.urls ?? [];
    if (Array.isArray(urls) && urls.length > 0) {
      return urls;
    }
  } catch {
    // noop: fallback below
  }

  return Promise.all(imageFiles.map(fileToDataUrl));
}
