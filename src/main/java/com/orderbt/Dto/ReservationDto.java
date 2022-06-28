package com.orderbt.Dto;

import lombok.Data;
import org.apache.tomcat.jni.Local;

import java.time.LocalDate;

@Data
public class ReservationDto {
    private Long id;
    private String type;
    private String typeDtl;
    private String date;
    private String time;
}
