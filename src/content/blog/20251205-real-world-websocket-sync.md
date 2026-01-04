---
title: Websocket Data Management in Real Time Systems
description: >
  Discussion on complex websocket issues in real time production systems.
date: 2025-12-05
heroImage: ./blog-assets/20250129-from-junior-to-staff-slides.png
alt: From Junior to Staff - What's my role?
tags:
  - Architecture
---

Think about chat - 2 users are messaging simultaneously back and forth. Naively, we would write a POST request to the server for the create and then receive a websocket with the new message's content to display. In a perfect world of connectivity, this will get you all the messages to display for both users but it comes with some drawbacks.

1. How do you know what order to display the messages?

- Created at order but who owns? Server or clients? What if system clocks are out of sync?
- How do you prevent timestamp spoofing if client managed? Concerns with desync'd clocks from the universal server time - timezones not an issue if using UTC correctly
- Issue with server is distributed systems aren't true FIFO due to concurrency
- What about ordering by a version value? Version changes with each update so will continually bump to next value and inconsistent order

2. What if the user misses a message due to dropped connectivity?

- Several different events for consideration - internet connection drop, websocket connection drop, tab refocus especially if it goes to sleep
- Unless you have a guaranteed delivery socket system, each reconnection event has to a fetch to recover any missing messages - do you fetch the last window? Everything since last connection? What makes the most sense? Deltas or last page fetch pending data needs
- onLine detection is browser level and not if your device actually has a connection
- every tab focus is _heavy_ because of constant re-tabbing

3. How do we keep all active tabs in-sync?

- Websockets or broadcast API
- What if you have indexedDB or some other local storage system in play
