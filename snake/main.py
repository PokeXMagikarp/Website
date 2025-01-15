import pygame
import random
import sys
import asyncio

# Initialize pygame
pygame.init()

# Define colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (213, 50, 80)
GREEN = (0, 255, 0)
BLUE = (50, 153, 213)

# Screen dimensions
WIDTH = 800
HEIGHT = 600

# Snake block size
BLOCK_SIZE = 20

# Clock
clock = pygame.time.Clock()

# Speed of the snake
SNAKE_SPEED = 15

# Font style
font_style = pygame.font.SysFont("bahnschrift", 25)
score_font = pygame.font.SysFont("comicsansms", 35)

def your_score(score):
    value = score_font.render("Your Score: " + str(score), True, GREEN)
    dis.blit(value, [0, 0])

def our_snake(block_size, snake_list):
    for x in snake_list:
        pygame.draw.rect(dis, BLACK, [x[0], x[1], block_size, block_size])

def message(msg, color):
    mesg = font_style.render(msg, True, color)
    dis.blit(mesg, [WIDTH / 6, HEIGHT / 3])

class variables:
    def __init__(self):
        self.game_over = False
        self.game_close = False

        self.x1 = WIDTH / 2
        self.y1 = HEIGHT / 2

        self.x1_change = 0
        self.y1_change = 0

        self.snake_list = []
        self.length_of_snake = 1

        self.foodx = round(random.randrange(0, WIDTH - BLOCK_SIZE) / BLOCK_SIZE) * BLOCK_SIZE
        self.foody = round(random.randrange(0, HEIGHT - BLOCK_SIZE) / BLOCK_SIZE) * BLOCK_SIZE

    def reset(self):
        self.game_over = False
        self.game_close = False

        self.x1 = WIDTH / 2
        self.y1 = HEIGHT / 2

        self.x1_change = 0
        self.y1_change = 0

        self.snake_list = []
        self.length_of_snake = 1

        self.foodx = round(random.randrange(0, WIDTH - BLOCK_SIZE) / BLOCK_SIZE) * BLOCK_SIZE
        self.foody = round(random.randrange(0, HEIGHT - BLOCK_SIZE) / BLOCK_SIZE) * BLOCK_SIZE

async def game_loop():
    v = variables()  # Initialize the variables class

    while not v.game_over:

        while v.game_close:
            dis.fill(BLUE)
            message("You Lost! Press C-Play Again", RED)
            your_score(v.length_of_snake - 1)
            pygame.display.update()
            await asyncio.sleep(0)
            
            for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_c:
                        v.reset()  # Correctly call the reset method

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                v.game_over = True
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT and v.x1_change == 0:
                    v.x1_change = -BLOCK_SIZE
                    v.y1_change = 0
                elif event.key == pygame.K_RIGHT and v.x1_change == 0:
                    v.x1_change = BLOCK_SIZE
                    v.y1_change = 0
                elif event.key == pygame.K_UP and v.y1_change == 0:
                    v.y1_change = -BLOCK_SIZE
                    v.x1_change = 0
                elif event.key == pygame.K_DOWN and v.y1_change == 0:
                    v.y1_change = BLOCK_SIZE
                    v.x1_change = 0

        if v.x1 >= WIDTH or v.x1 < 0 or v.y1 >= HEIGHT or v.y1 < 0:
            v.game_close = True
        v.x1 += v.x1_change
        v.y1 += v.y1_change
        dis.fill(WHITE)
        pygame.draw.rect(dis, GREEN, [v.foodx, v.foody, BLOCK_SIZE, BLOCK_SIZE])
        snake_head = [v.x1, v.y1]
        v.snake_list.append(snake_head)
        if len(v.snake_list) > v.length_of_snake:
            del v.snake_list[0]

        for segment in v.snake_list[:-1]:
            if segment == snake_head:
                v.game_close = True

        our_snake(BLOCK_SIZE, v.snake_list)
        your_score(v.length_of_snake - 1)

        pygame.display.update()
        await asyncio.sleep(0)

        if v.x1 == v.foodx and v.y1 == v.foody:
            v.foodx = round(random.randrange(0, WIDTH - BLOCK_SIZE) / BLOCK_SIZE) * BLOCK_SIZE
            v.foody = round(random.randrange(0, HEIGHT - BLOCK_SIZE) / BLOCK_SIZE) * BLOCK_SIZE
            v.length_of_snake += 1

        clock.tick(SNAKE_SPEED)

    pygame.quit()
    sys.exit()

# Main entry point
if __name__ == "__main__":
    # Create display
    dis = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Snake Game")

    # Special Pygbag compatibility hook
    if hasattr(sys, "_MEIPASS"):  # Pygbag uses this flag
        print("Running in Pygbag")

    asyncio.run(game_loop())
