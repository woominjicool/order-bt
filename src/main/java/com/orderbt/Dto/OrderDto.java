package com.orderbt.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private String purpose;
    private String rating;
    private String maxRating;
    private String batteryCell;
    private String cellModel;
    private String voltage;
    private String ampere;
    private String pcm;
    private String pcmRemark;
    private String caseType;
    private String caseRemark;
    private Long sampleQty;
    private String sampleDate;
    private String address;
    private String addressDtl;
    private String remark;
    private List<MultipartFile> attachFile;
    private String files;
}
