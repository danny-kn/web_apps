require 'rainbow'

class Card
  NUMBERS = %w{ 1 2 3 } # rep. the card's 1st feature.
  SHAPES = %w{ Oval Squiggle Diamond } # rep. the card's 2nd feature.
  SHADINGS = %w{ Solid Striped Open } # rep. the card's 3rd feature.
  COLORS = %w{ Red Green Purple } # rep. the card's 4th feature.

  attr_reader :number, :shape, :shading, :color

  def initialize(number, shape, shading, color)
    @number = number
    @shape = shape
    @shading = shading
    @color = color

    validate!
  end

  def self.valid_set?(card_1, card_2, card_3)
    features_1 = [card_1.number, card_1.shape, card_1.shading, card_1.color]
    features_2 = [card_2.number, card_2.shape, card_2.shading, card_2.color]
    features_3 = [card_3.number, card_3.shape, card_3.shading, card_3.color]

    features_1.zip(features_2, features_3).all? { |arr| [1, 3].include?(arr.uniq.length) }
  end

  def to_s
    txt_color = case @color
                when 'Red'
                  :red
                when 'Green'
                  :green
                else
                  :purple
                end
    "#{@number} #{@shape} #{@shading} #{Rainbow(@color).color(txt_color)}"
  end

  def validate!
    validate_number!
    validate_shape!
    validate_shading!
    validate_color!
  end

  def validate_number!; raise ArgumentError.new('Selected an invalid number.') unless NUMBERS.include?(number); end
  def validate_shape!; raise ArgumentError.new('Selected an invalid shape.') unless SHAPES.include?(shape); end
  def validate_shading!; raise ArgumentError.new('Selected an invalid shading.') unless SHADINGS.include?(shading); end
  def validate_color!; raise ArgumentError.new('Selected an invalid color.') unless COLORS.include?(color); end
end
