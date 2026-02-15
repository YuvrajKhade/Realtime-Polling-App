package com.pollApp.realTimePollRooms.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OptionResponse {
    private Long id;
    private String text;
    private int voteCount;
}
