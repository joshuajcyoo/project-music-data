# def funcHopSkipJump(matrix):
# 	# Write your code here

# 	return

# def main():
# 	#input for matrix
# 	matrix = []
# 	matrix_rows,matrix_cols  = map(int, input().split())
# 	for idx in range(matrix_rows):
# 		matrix.append(list(map(int, input().split())))
	
	
# 	result = funcHopSkipJump(matrix)
# 	print(result)	

# if __name__ == "__main__":
# 	main()


def funcHopSkipJump(matrix):
	# Write your code here
	matrix_rows = len(matrix)
	matrix_columns = len(matrix[0])

	past_numbers = []
	reached_last = False
	final_number = matrix[0][0]

	def checkSpace(matrix, row, column, direction):
		doesSpaceExist = False
		
		if direction == "down":
			if (row + 2) <= matrix_rows and matrix[row][column] not in past_numbers:
				doesSpaceExist = True
			doesSpaceExist = False
		elif direction == "right":
			if (column + 2) <= matrix_columns and matrix[row][column] not in past_numbers:
				doesSpaceExist = True
			doesSpaceExist = False
		elif direction == "up":
			if (row - 2) >= 0 and matrix[row][column] not in past_numbers:
				doesSpaceExist = True
			doesSpaceExist = False
		elif direction == "left":
			if (column - 2) >= 0 and matrix[row][column] not in past_numbers:
				doesSpaceExist = True
			doesSpaceExist = False
		
		return doesSpaceExist
	
	current_row = 0
	current_column = 0
	current_direction = "down"
	current_iteration = 0
	
	while not reached_last:
		past_numbers.append(matrix[current_row][current_column])
		final_number = matrix[current_row][current_column]
		check_space = checkSpace(matrix, current_row, current_column, current_direction)
		if check_space:
			current_row += 2
		else:
			if current_direction == "down":
				current_column += (2 - (matrix_rows - current_row - 1))
				current_direction = "right"
			elif current_direction == "right":
				current_row -= ()


	return

def main():
	#input for matrix
	matrix = []
	matrix_rows,matrix_cols  = map(int, input().split())
	for idx in range(matrix_rows):
		matrix.append(list(map(int, input().split())))
	
	
	result = funcHopSkipJump(matrix)
	print(result)	

if __name__ == "__main__":
	main()