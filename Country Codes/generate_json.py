import json

country_to_code = {}
code_to_country = {}

with open("country_codes.json") as json_file:
    data = json.load(json_file)
    for block in data:
        country = block["CLDR display name"]
        code = block["ISO3166-1-Alpha-3"]
        if not code or not country:
            continue
        country_to_code[country] = code
        code_to_country[code] = country

with open("country_to_code.json", 'w') as outfile:
    json.dump(country_to_code, outfile, ensure_ascii=False, sort_keys=True, indent=4)
with open("code_to_country.json", 'w') as outfile:
    json.dump(code_to_country, outfile, ensure_ascii=False, sort_keys=True, indent=4)