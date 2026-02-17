package com.pollApp.realTimePollRooms.controller;

import com.pollApp.realTimePollRooms.io.CreatePollRequest;
import com.pollApp.realTimePollRooms.io.PollResponse;
import com.pollApp.realTimePollRooms.io.VoteRequest;
import com.pollApp.realTimePollRooms.service.PollService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/polls")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@Slf4j
public class PollController {
    private final PollService pollService;

    @PostMapping
    public ResponseEntity<PollResponse> createPoll(
            @Valid @RequestBody CreatePollRequest request,
            HttpServletRequest httpRequest
            ){

        String creatorIp=getClientIp(httpRequest);
        log.info("Creating Poll from ip: {}",creatorIp);

        PollResponse response=pollService.createPoll(request,creatorIp);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/{pollId}")
    public ResponseEntity<PollResponse> getPoll(@PathVariable String pollId){
        log.info("Fetching poll: {}",pollId);
        PollResponse response=pollService.getPoll(pollId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{pollId}/vote")
    public ResponseEntity<PollResponse> vote(
            @PathVariable String pollId,
            @Valid @RequestBody VoteRequest request,
            HttpServletRequest httpRequest
            ){
        String voterIp=getClientIp(httpRequest);
        log.info("Vote received from Ip: {}",voterIp);

        PollResponse response=pollService.vote(pollId,request,voterIp);
        return ResponseEntity.ok(response);
    }


    private String getClientIp(HttpServletRequest httpRequest) {
        String ip=httpRequest.getHeader("X-Forwarded-For");

        if(ip==null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)){
            ip=httpRequest.getHeader("X-Real-IP");
        }
        if(ip==null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)){
            ip=httpRequest.getRemoteAddr();
        }

        if(ip!=null && ip.contains(",")){
            ip=ip.split(",")[0].trim();
        }

        return ip;
    }
}
