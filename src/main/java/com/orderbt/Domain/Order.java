package com.orderbt.Domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(schema = "web", name = "order")
@Getter @Setter
public class Order {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private long id;

    @Column(name = "purpose")
    private String purpose;

    @Column(name = "rating")
    private String rating;

    @Column(name = "max_rating")
    private String maxRating;

    @Column(name = "battery_cell")
    private String batteryCell;

    @Column(name = "cell_model")
    private String cellModel;

    @Column(name = "voltage")
    private String voltage;

    @Column(name = "ampere")
    private String ampere;

    @Column(name = "pcm")
    private String pcm;

    @Column(name = "pcm_remark")
    private String pcmRemark;

    @Column(name = "case_type")
    private String caseType;

    @Column(name = "case_remark")
    private String caseRemark;

    @Column(name = "sample_qty")
    private Long sampleQty;

    @Column(name = "sample_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate sampleDate;

    @Column(name = "address")
    private String address;

    @Column(name = "address_dtl")
    private String addressDtl;

    @Column(name = "remark")
    private String remark;

    @OneToOne(mappedBy = "order")
    @JsonBackReference
    private Estimate estimate;
}
