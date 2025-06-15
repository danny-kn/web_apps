require_relative 'game'

class Set
    def initialize
      @usr_msg = 'Welcome to The Game of Set!'
    end

    def print_dashes(str)
        puts '-' * str.length
    end

    def print_welcome_msg
        puts @usr_msg
        print_dashes(@usr_msg)
    end

    def print_main_menu
        puts 'Please select an option:'
        puts '  1.) Start the game.'
        puts '  2.) Help.'
        puts '  3.) Quit the game.'
    end

    def print_prompt
        print 'Please enter the number of your choice: '
    end

    def print_help_menu
        puts File.read('../docs/help.txt')
    end

    def main_menu
        loop do
            print_welcome_msg
            print_main_menu
            print_prompt
            usr_in = gets.chomp
            case usr_in
            when '1'
                game = Game.new
                game.play
                break
            when '2'
                show_help
            when '3'
                puts 'Goodbye!'
                break
            else
                puts 'Please enter a valid input.'.upcase
                puts "\n"
            end
        end
    end

    def show_help
        puts "\n"
        print_help_menu
        puts 'If you would like to return to the main menu, please enter "0".'
        print 'Please enter the number of your choice: '
        usr_in = gets.chomp
        unless usr_in == '0'
            puts 'Please enter a valid input.'.upcase
        end
        puts "\n"
    end
end

set = Set.new
set.main_menu
