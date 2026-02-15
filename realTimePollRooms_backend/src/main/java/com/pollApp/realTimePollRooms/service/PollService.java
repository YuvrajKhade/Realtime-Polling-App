package com.pollApp.realTimePollRooms.service;

import com.pollApp.realTimePollRooms.exception.AlreadyVotedException;
import com.pollApp.realTimePollRooms.io.CreatePollRequest;
import com.pollApp.realTimePollRooms.io.OptionResponse;
import com.pollApp.realTimePollRooms.io.PollResponse;
import com.pollApp.realTimePollRooms.io.VoteRequest;
import com.pollApp.realTimePollRooms.model.Poll;
import com.pollApp.realTimePollRooms.model.PollOption;
import com.pollApp.realTimePollRooms.model.Vote;
import com.pollApp.realTimePollRooms.repository.PollOptionRepo;
import com.pollApp.realTimePollRooms.repository.PollRepository;
import com.pollApp.realTimePollRooms.repository.VoteRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PollService {

    private final PollRepository pollRepository;
    private final PollOptionRepo pollOptionRepo;
    private final VoteRepo voteRepo;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Transactional
    public PollResponse createPoll(CreatePollRequest request, String creator) {
        log.info("Creating poll with question: {}", request.getQuest());

        Poll poll = new Poll();
        poll.setQuestion(request.getQuest());
        poll.setCreator(creator);

        for (String optText : request.getOptions()) {
            if (optText != null && !optText.trim().isEmpty()) {
                PollOption option = new PollOption();
                option.setText(optText.trim());
                poll.addOption(option);
            }
        }

        Poll savedPoll = pollRepository.save(poll);
        log.info("Poll created successfully with ID: {}", savedPoll.getId());

        return convertToPollResponse(savedPoll);
    }

    private PollResponse convertToPollResponse(Poll savedPoll) {
        List<OptionResponse> optionResponses = savedPoll.getOptions().stream()
                .map(opt -> new OptionResponse(
                        opt.getId(),
                        opt.getText(),
                        opt.getVoteCount()
                ))
                .toList();

        int totalVotes = optionResponses.stream()
                .mapToInt(OptionResponse::getVoteCount)
                .sum();

        return new PollResponse(
                savedPoll.getId(),
                savedPoll.getQuestion(),
                optionResponses,
                totalVotes,
                savedPoll.getCreatedAt()
        );
    }

    public PollResponse getPoll(String pollId) {
        log.info("Fetching poll with id {}", pollId);
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new RuntimeException("Poll not found..:| with id: " + pollId));

        return convertToPollResponse(poll);
    }

    @Transactional
    public PollResponse vote(String pollId, VoteRequest voteRequest, String voter) {
        log.info("Processing vote for poll: {}, options: {}, voter: {}", pollId, voteRequest.getOptId(), voteRequest.getVoterId());

        if (voteRepo.existsByPollIdAndVoterId(pollId, voteRequest.getVoterId())) {
            throw new AlreadyVotedException("You have already voted in this poll");
        }

        if (voteRepo.existsByPollIdAndVoter(pollId, voter)) {
            throw new AlreadyVotedException("A vote has already been cast from your network");
        }

        PollOption opt = pollOptionRepo.findById(voteRequest.getOptId())
                .orElseThrow(() -> new RuntimeException("Option not found"));

        if (!opt.getPoll().getId().equals(pollId)) {
            throw new RuntimeException("Option does not belong to this poll");
        }

        Vote vote = new Vote();
        vote.setPollOpt(opt);
        vote.setPollId(pollId);
        vote.setVoterId(voteRequest.getVoterId());
        vote.setVoter(voter);

        voteRepo.save(vote);
        log.info("Vote Recorded successfully");

        PollResponse pollResponse = getPoll(pollId);

        simpMessagingTemplate.convertAndSend("/topic/poll/" + pollId, pollResponse);
        log.info("Poll update broadcast via WebSocket");

        return pollResponse;
    }

}
