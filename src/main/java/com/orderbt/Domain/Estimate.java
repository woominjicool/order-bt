package com.orderbt.Domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(schema = "web", name = "estimate")
@Getter @Setter
public class Estimate {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "company")
    private String company;

    @Column(name = "name")
    private String name;

    @Column(name = "tel")
    private String tel;

    @Column(name = "email")
    private String email;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    @JsonManagedReference
    private Order order;

    @OneToOne
    @JoinColumn(name = "reservation_id")
    @JsonManagedReference
    private Reservation reservation;
}
