---
layout: project
title: 'Strava Activities'
caption: Every activity I've ever recorded on Strava.
description: >
  
date: 1 Jun 2020
image: 
  path: /assets/img/projects/strava.png
  srcset: 
    1920w: /assets/img/projects/strava.png
    960w:  /assets/img/projects/strava.png
    480w:  /assets/img/projects/strava.png
accent_color: '#4fb1ba'
accent_image:
  background: '#193747'
theme_color: '#193747'
sitemap: false
no_push_state: true
no_pjax: true

---

As someone who is passionate about exercise, I sometimes log my runs, rides, or tours. 
These communities often emphasis speed or distance over breadth and experience. 

I got to thinking, instead of focusing on the stats of a single activity, we could start focusing on the total footprint of all an idividuals activities as a performance metric. The literal and figurative 'extent' of activities they have done. 

This can be a metric that shifts motivations away from traditional performance, and more towards consistency, curiosity, and exploration. Each ride isnt just a workout, its an addition to your personal atlas.

{% include strava_map.html %}

Brain dump for how the metric could be calculated...
-Unique distance score - rewards all new (non-repeated) miles. Doesnt take into account exploration/ spatial extent.
-Tile based scpre - score grows based on number of tiles that user has entered. Decreases the influence of high density areas like bike parks, will not allow the same tile counted twice. What is the correct tile size?



