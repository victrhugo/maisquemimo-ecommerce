package com.maisquemimo.commerce.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

/**
 * Value Object para endereço de entrega
 */
@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShippingAddress {

    private String street;

    private String number;

    private String complement;

    private String neighborhood;

    private String city;

    private String state;

    private String zipCode;

}
