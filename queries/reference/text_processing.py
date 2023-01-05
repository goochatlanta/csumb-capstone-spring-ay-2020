# open raw file
path = ""
lines = [line for line in open(path)]

# build strings
raw_tokens = lines[0].split(',')
prefix = "    MentionSourceName LIKE '%"
postfix = "%' OR"

# output
# off by one char
for toke in raw_tokens:
    print(prefix + toke[1:-1] + postfix)
