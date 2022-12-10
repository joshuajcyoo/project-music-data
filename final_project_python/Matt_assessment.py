def merge(a, b):
    a = list(a)
    i = 0
    j = 0
    while i < len(a) and j < len(b):
        if a[i] < b[j]:
            i += 1
        elif a[i] > b[j]:
            a.insert(i, b[j])
            j += 1
        else:
            i += 1
            j += 1
    
    a.extend(b[j:])
    return a

def repeat(a, b):
    last = []
    while a != last:
        last = a
        a = merge(a, b)
    return a

# print(merge([1, 3, 4], [1, 7, 5]))

print(repeat([7, 4, 2], [5, 3, 1]))