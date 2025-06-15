require_relative 'card'

class Deck
  attr_accessor :cards

  def initialize
    @cards = []
    Card::NUMBERS.each do |number|
      Card::SHAPES.each do |shape|
        Card::SHADINGS.each do |shading|
          Card::COLORS.each do |color|
            @cards << (Card.new(number, shape, shading, color))
          end
        end
      end
    end
    shuffle!
  end

  def count; @cards.length; end
  def shuffle!; @cards.shuffle!; end
  def draw; @cards.pop; end
  def empty?; @cards.empty?; end
end
