---
title: Challenges of the SWE Interview Process
description: >
  The SWE interview process has always been riddled with challenges. Specifically, how we approach technically validating a candidate continues to be a struggle. These are my thoughts on that process and where I hope to see the industry move.
date: 2024-01-01
heroImage: ./blog-assets/20240101-challenges-swe-interview-process.png
alt: Challenges of the SWE Interview Process
tags:
  - Engineering Leadership
---

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The software engineering interview process has always been a challenging problem. I spoke on the subject back in 2018 at Women Who Code's We RISE conference where I discussed how a wide array of companies were employing interview processes. I had a unique perspective at the time as I was actively applying for new roles and also heavily interviewing candidates for my company at the time. Ultimately, I was looking to simplify the process and make it more practical for both small and large companies alike. Then, right before the holidays, I was scrolling Twitter and noticed this post from [Anthony Mays](https://twitter.com/anthonydmays).

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Why can&#39;t the SWE interview process just be:<br><br>1) I submit a cool project I verifiably worked on<br>2) We do a behavioral interview<br>3) PROFIT!</p>&mdash; Anthony D. Mays (@anthonydmays) <a href="https://twitter.com/anthonydmays/status/1737606020090962180?ref_src=twsrc%5Etfw">December 20, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

My immediate reaction was "YES!" This is the type of process we ideally would employ industry wide, and it would greatly improve the experience for everyone involved. Unfortunately, this has complications in a real world setting that would need to be resolved.

## My Team's Process

Before we get into the challenges, I want to explain my current team's process and why we operate this way so I can talk about the complexities of the technical interview. Our steps for engineers are as follows:

1. Resume review to ensure the candidate is qualified to continue.
2. Candidate responds to several phone screen questions in writing.
3. Candidate completes our take home exercise.
4. Candidate exercise is reviewed by our internal team and graded for level.
5. Candidate does 2 behavioral interviews. 1 with a tech lead or manager, 1 with our CEO.
6. Offer and negotiation phase including background check.

There are some optimizations that could be made here in the first couple of steps. One of the concerns with our process is you don't actually talk to a human until step 5. Our team does this for a few reasons, including challenges with scheduling due to timezones, volume of candidates when a job is listed, and others. But, there are a few elements I really liked as a candidate and continued to appreciate as a manager.

### The Phone Screen Questionnaire

Our phone screen in writing helps individuals take their time to respond rather than making them think on their feet when they're nervous in an interview setting. It also helps to establish some expectations and identify any key issues with alignment.

The first issue we can quickly resolve is salary misalignment. We have our budget for a position and if the ask is out of band, we can have that conversation quickly via email and determine if it's worth both party's time to move forward.

We ask some questions around job interest and values. These help to identify early if a candidate has misaligned intentions or will not be a good long term fit for our team.

### Take Home Exercise

For our take home, we've curated an exercise that aligns with the types of tasks we'd expect a candidate to perform day-to-day on our team. We capped the exercise at 4 hours but allow them a full week to turn around the exercise.

We allow a full week as candidate schedules with other responsibilities can be challenging and we want to allow them the flexibility to complete the exercise when they're able to do so comfortably.

However, we try to limit them to 4 hours so they don't spend an excessive amount of time on the project. This also serves a secondary purpose of helping us to understand how they think and prioritize requirements which is extremely valuable given our business model.

The standardized exercise is great for our team because we can train multiple individuals to grade and rate exercises. This allows our process to scale as needed and provides a level of consistency in the process.

### Behavioral Interviews

These serve as a great time to really get to know the candidate and clarify any questions that are outstanding from the questionnaire and take home. It allows our team to really get to know the candidate. Because an interviewer wasn't fully involved in the questionnaire or take home exercise review, they're lacking bias which allows the candidate a fair chance.

## Using Existing Code for Take Home Submissions

So coming back to the original challenge - why can't candidates use their own open source projects for submission? My team tried this a few times and it had some major downsides for our process.

### Finding what the candidate did...

Candidates struggled finding the right project to share with us. Several would point us to large open source projects or group projects they did with friends. This alone presented a challenge of finding what code the candidate actually wrote. We attempted to request pull requests which narrowed their submissions to far to attain any signal from the submission.

Someone might argue this would show their collaboration skills as there are PRs with feedback and other linked issues. Unfortunately, most candidates were talking to other collaborators in Discord or other messaging apps and were managing issues externally from GitHub. This did very little to help us grade them.

### Lack of project context

Another problem these projects present is the amount of context required to get into codebase. Let's say we were able to find a good sample of the candidate's code - pending on their communication skills in the pull requests - we might not understand what the change is or why they're making it. This puts extra effort on reviewers to determine what's going on which can take significantly more time than a standardized submission might take.

### Demonstrating the wrong skills

The last challenge is what is the candidate demonstrating with their submission? A lot of the time they're showing their ability to manipulate existing code or deliver small algorithms because that's what they think is interesting. Our take home for instance is trying to identify the skill sets they need for the role we're hiring for but these self-submission may only cover 1 aspect of our needs.

When any of these issues comes to light, we quickly just ask for the take home we wrote anyway. This has a downside of extending the interview period which can lead to the candidate not getting the role or finding a different role. It's very frustrating as an interviewer and candidate when this happens so we've opted to avoid it altogether and stopped accepting existing projects.

## Conclusion

Overall, the idea of receiving existing projects is ideal, but they would need to be standardized in a way that the full industry would accept. I don't think this is going to be feasible especially with new emerging technology and generative AI tooling and how it's changing how we approach problem solving.

I personally like our process as it seeks to quickly find candidates and get them to a yes or no as quickly as possible (max. ~3 weeks). As a candidate, I was put off by the lack of human interaction early on but that was also a great test for remote working where interactions can be limited. There are definitely ways to improve all these processes and I hope one day we find a better solution as an industry, but for now, I think each company will have to employ what they think is best for their team.
