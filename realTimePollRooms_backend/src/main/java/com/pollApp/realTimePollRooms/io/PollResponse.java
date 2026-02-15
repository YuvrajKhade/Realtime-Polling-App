package com.pollApp.realTimePollRooms.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PollResponse {
    private String id;
    private String quest;
    private List<OptionResponse> opts;
    private int totalVotes;
    private LocalDateTime createdAt;
}
