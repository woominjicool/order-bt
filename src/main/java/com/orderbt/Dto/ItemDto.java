package com.orderbt.Dto;

import lombok.Data;

@Data
public class ItemDto {
    private Long id;
    private String category;
    private String name;
    private Long price;
    private String active;
    private String remark;
    private String type;
    private String detail;
}
