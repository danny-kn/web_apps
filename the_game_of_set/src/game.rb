require_relative 'card'
require_relative 'deck'

class Game
  def initialize
    @deck = Deck.new
    @board = []
    # initially, 12 cards are dealt face-up.
    12.times { @board << @deck.draw }
    @score = 0
  end

  def print_board
    puts "\n"
    @board.each_with_index do |card, i|
      padding = i <= 9 ? " " : ""
      puts "#{padding}#{i}: #{card}"
    end
  end

  def print_usr_msg
    puts 'Please enter the indices of the 3 cards you would like to select.'
    puts 'Ensure to separate the indices with a space.'
    puts 'For instance, to select the 1st, 2nd, and 3rd card, please enter "0 1 2".'
    puts 'If you would like to quit, please enter "q".'
  end

  def print_score
    puts "Score: #{@score}"
  end

  def print_prompt
    print 'Please enter your selection: '
  end

  def replace_cards(idx)
    idx.each do |i|
      @board[i] = @deck.draw if !@deck.empty?
    end
  end

  def valid_index?(idx)
    return false unless idx.length == 3
    return false unless idx.uniq.length == idx.length
    idx.all? { |i| i >= 0 && i < @board.length }
  end

  def play
    while true
      print_board
      puts "\n"
      print_usr_msg
      print_prompt
      usr_in = gets.chomp
      if usr_in == 'q'
        puts 'Goodbye!'
        break
      end
      begin
        idx = usr_in.split(' ').map(&:to_i)
        if valid_index?(idx) && Card.valid_set?(@board[idx[0]], @board[idx[1]], @board[idx[2]])
        @score += 1
        replace_cards(idx)
        puts 'Correct!'
        print_score
      else
        puts 'Incorrect!'
        print_score
      end
      rescue => e
        puts 'Invalid input! Please enter 3 valid numbers.'
        print_score
      end
    end
  end
end
