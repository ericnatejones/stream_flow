import csv
import os
import sys

sys.path.append("..")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "stream_flow.settings")

from apps.flows.models import Site

csv_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sites.csv")
csv_file = open(csv_file_path, 'r')
reader = csv.DictReader(csv_file)

sites = Site.objects.all()

for row in reader:
    new_site, created = Site.objects.get_or_create(site=row['site'])
    new_site.site = row['site']
    new_site.description = row['description']
    new_site.save()
    print row
    print created
csv_file.close()

