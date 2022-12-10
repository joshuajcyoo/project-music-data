# def funcSubstring(inputStr):
# 	# Write your code here

# 	return

# def main():
# 	#input for inputStr
# 	inputStr = str(input())
	
	
# 	result = funcSubstring(inputStr)
# 	print(result)	

# if __name__ == "__main__":
# 	main()

def funcSubstring(inputStr):
	
    def findLongestSubstring(string, i, j):
        while i >= 0 and j < len(string) and string[i] == string[j]:
            i -= 1
            j += 1
        return string[i+1:j]

    final_string = ""
    for i in (range(len(inputStr))):
        # print(i)
        # print(i + 1)
        centered_around_1 = findLongestSubstring(inputStr, i, i)
        centered_around_2 = findLongestSubstring(inputStr, i, (i + 1))
        
        if len(centered_around_1) > len(centered_around_2):
            if len(centered_around_1) > len(final_string): 
                final_string = centered_around_1
        else:
            if len(centered_around_2) > len(final_string):
                final_string = centered_around_2
    return final_string

def main():
	#input for inputStr
	inputStr = str(input("YABCCBAD"))
	
	result = funcSubstring(inputStr)
	print(result)	

main()
    