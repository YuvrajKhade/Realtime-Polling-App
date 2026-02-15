package com.pollApp.realTimePollRooms.exception;

public class AlreadyVotedException extends RuntimeException{
    public AlreadyVotedException(String msg){
        super(msg);
    }
}
