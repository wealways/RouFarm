package com.c105.roufarm.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportPageService {
      
      @Autowired
      UserLogService userLogService;

      // 1. 리포트 페이지에 보여줄 잔디와 해쉬태그별 통계
      @Transactional
      public HashMap<String,Object> findReportForGrassAndHashtag(){
            HashMap<String,ArrayList<Integer>> logsForGrass = userLogService.findLogForGrass();
            HashMap<String,HashMap<String,HashMap<String,HashMap<String,Object>>>> logsForHashtag = userLogService.findLogForHashtag();
            HashMap<String,Object> reportForGrassAndHashtag = new HashMap<String,Object>();
            for(String logsKey : logsForGrass.keySet()){
                  ArrayList<Integer> daylist = logsForGrass.get(logsKey);
                  HashMap<String,Object> contents = new HashMap<String,Object>();
                  contents.put("월간수확", daylist);

                  HashMap<String,Object> hashtagBuilder = new HashMap<>();
                  HashMap<String,HashMap<String,HashMap<String,Object>>> hashtags = logsForHashtag.get(logsKey);
                  for(String hashtag : hashtags.keySet()){
                        ArrayList<HashMap<String,Object>> hashtaglist = new ArrayList<>();
                        HashMap<String,HashMap<String,Object>> hashtagValues = hashtags.get(hashtag);
                        for(String hashtagId : hashtagValues.keySet()){
                              HashMap<String,Object> hashtagContent = new HashMap<>();
                              HashMap<String,Object> hashtagValue = hashtagValues.get(hashtagId);
                              hashtagContent.put("id", hashtagId);
                              hashtagContent.put("content", hashtagValue.get("content"));
                              hashtagContent.put("cnt", hashtagValue.get("cnt"));
                              hashtagContent.put("rate", hashtagValue.get("rate"));
                              hashtaglist.add(hashtagContent);
                        }
                        hashtagBuilder.put(hashtag, hashtaglist);
                  }
                  contents.put("해쉬태그별", hashtagBuilder);

                  reportForGrassAndHashtag.put(logsKey, contents);
            }
            return reportForGrassAndHashtag;
      }
}
