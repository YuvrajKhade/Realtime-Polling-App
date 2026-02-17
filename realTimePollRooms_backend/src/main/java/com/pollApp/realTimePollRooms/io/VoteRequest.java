package com.pollApp.realTimePollRooms.io;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoteRequest {

    @NotNull(message = "Option id is required")
    private Long optId;

    @NotNull(message = "Voter id is required")
    private String voterId;

}
