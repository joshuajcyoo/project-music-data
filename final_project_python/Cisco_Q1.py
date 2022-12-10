def funcRotate(inputMat):
	# Write your code here

	return

def main():
	#input for inputMat
	inputMat = []
	inputMat_rows,inputMat_cols  = map(int, input().split())
	for idx in range(inputMat_rows):
		inputMat.append(list(map(int, input().split())))
	
	
	result = funcRotate(inputMat)
	print(result)	

if __name__ == "__main__":
	main()