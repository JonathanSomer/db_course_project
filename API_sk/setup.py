#!/usr/bin/env python

from distutils.core import setup

setup(name='rocket',
      version='0.1.1',
      description='Python Library for implementing API\'s with a quickness',
      author='James Dennis',
      author_email='james@extension.fm',
      url='http://github.com/extensionfm/rocket',
      packages=['rocket'])

setup(name='r_songkick',
      version='0.1',
      description='Python Client Library for the Songkick API',
      author='James Dennis',
      author_email='james@extension.fm',
      url='https://github.com/exfm/rocket/tree/master/modules/r_songkick',
      py_modules=['r_songkick'], requires=['mySQLdb'])