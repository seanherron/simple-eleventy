---
title: Home
layout: base
---

# Hi there!

Welcome to my site!

{% for item in collections.post | reverse %}
<article><time value="{{ item.date }}">{{ item.date }}</time> - <a href="{{ item.url }}">{{ item.data.title }}</a></article>
{% endfor %}