import json

default_file_content = '''\
---
title: {title}
layout: '@/layouts/learn.astro'
---

TODO: add content
'''


def get_json_contents(filename):
    with open(f'src/navData/{filename}.json') as f:
        return json.load(f)


def create_doc(route):
    filepath = f"src/pages/{route.get('path')}.md"
    file_content = default_file_content.format(title=route.get('title'))
    with open(filepath, 'w+') as file:
        file.write(file_content)


def iterate_toc(toc):
    for route in toc.get('routes'):
        if bool(route.get('routes')):
            iterate_toc(route)
        create_doc(route)


filename = input('Source File: ')
toc = get_json_contents(filename)
iterate_toc(toc)
