package com.pollApp.realTimePollRooms.io;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePollRequest {

    @NotBlank(message = "Question is required")
    @Size(min=5, max=500,message = "Question must be between 5 and 500 characters")
    private String quest;

    @NotBlank(message = "Options are required")
    @Size(min=2, max=10,message = "Poll must be between 2 and 10 options")
    private List<String> options;

}
