# !/bin/bash
python3 manage.py migrate
fixtures=$(ls ./authentication/seeds/)
echo $(ls ./authentication/seeds/)
while IFS= read -r fixture; do
    echo -n "Seeding "
    echo $fixture
    python3 manage.py loaddata authentication/seeds/$fixture
done <<< "$fixtures"