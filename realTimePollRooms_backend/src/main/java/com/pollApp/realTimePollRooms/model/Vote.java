package com.pollApp.realTimePollRooms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "votes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option_id", nullable = false)
    private PollOption pollOpt;

    @Column(name = "poll_id",nullable = false)
    private String pollId;

    @Column(name = "voter_id",nullable = false)
    private  Long voterId;

    @Column(name = "voter",nullable = false)
    private String voter;

    @CreationTimestamp
    @Column(nullable = false,updatable = false)
    private LocalDateTime votedAt;
}
