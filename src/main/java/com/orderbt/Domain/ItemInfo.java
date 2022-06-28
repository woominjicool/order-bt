package com.orderbt.Domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(schema = "web", name = "item_info")
@Getter @Setter
public class ItemInfo implements Comparable<ItemInfo>{
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "detail")
    private String detail;

    @ManyToOne
    @JoinColumn(name = "item_id", insertable = false, updatable = false)
    @JsonBackReference
    private Item item;

    @Override
    public int compareTo(ItemInfo o) {
        return (int) (getId() - o.getId());
    }
}
