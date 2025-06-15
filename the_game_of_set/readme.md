## Project 1: The Game of Set

---

### Description

In this project, I implement [_The Game of Set_](https://en.wikipedia.org/wiki/Set_(card_game)), which is commonly referred to as _Set_ (stylized as ___SET___ or ___SET!___). It is a real-time card game in which players attempt to find a group of cards that satisfy a particular criterion. The deck consists of 81 unique cards that vary in four features across three possibilities for each kind of feature: `number of shapes` (one, two, or three), `shape` (diamond, squiggle, or oval), `shading` (solid, striped, or open), and `color` (red, green, or purple). _Set_ is a speed game: 12 cards are dealt face-up, and the players try to be the first to make a "set" from the visible cards, which means that for each one of the four categories of features - `number of shapes`, `shape`, `shading`, and `color` - the three cards must display that feature as either __a.) all the same__, or __b.) all different__. In other words, for each feature, the three cards must _avoid_ having two cards showing one version of the feature and the remaining card showing a different version.

### Usage

First, clone this repository. Then, after cloning, please navigate to the `the_game_of_set` directory using the `cd the_game_of_set/` command. Ensure to have the `rainbow` gem installed, which incorporates additional functionality to colorize printed text on ANSI terminals. To obtain the required gems, please execute the `bundle install` command. Then, navigate to the `src` directory using the `cd src/` command. If you would like to execute the program to test its functionality, use the `bundle exec ruby set.rb` command.
