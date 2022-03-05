from datetime import date, timedelta
from datetime import date
import calendar
import os

daysLetter = ""
fileString = ""

#Date should be within a week (from Mon to Sun) so the string for the time_conf.txt can be produced correctly
start_date = date(2022, 1, 25) 
end_date = date(2022, 2, 1)
teamID = ("lab1")

print("Useful Info: ")
print("SDate: ", start_date, "EDate : ", end_date, "\n")

# returns timedelta
delta = end_date - start_date

for i in range(delta.days + 1):
    date = start_date + timedelta(days=i)
    day = calendar.day_name[date.weekday()]
    print(date, end=" ")
    print(day)
    daysLetter = daysLetter + day[:2]

print (daysLetter)

#Creating string for time_conf.txt
daysLetter = daysLetter.replace(' ', '')
timeLimit = "0000-2400"
fileString = "sshd;*;" + teamID + ";" + daysLetter + timeLimit
print("\nString to be adding in the file: ", fileString)

#Open time_conf.txt#
file1 = open("time_conf.txt","w")
file1.write(fileString)
file1.close()
file1 = open("time_conf.txt","r")
print("\nOutput of Readlines after writing") 
print(file1.readlines())
print()
file1.close()

#Servers Health Log Initials
server_id = 100
initial_health = "Good (98%)"

#Termination Script Path [!! Filename here has to be changed to 'terminate.sh' from 'script.sh', once the code is ready]
script_path = "/var/terminate.sh"

#Termination Date
Termination_date = end_date + timedelta(days=1)

#Tremination Script
#Assumed that teamID is same as the userName
terminate = "pkill -9 -u `id -u "+ teamID + "`;crontab -u root -l | grep -v '/bin/sh " + script_path + "'  | crontab -u root -; truncate -s 0 terminate.sh"

#Open terminate.sh
file1 = open("terminate.sh","w")
file1.write(terminate)
file1.close()

#Crontab Addition
cron = "(crontab -l ; echo " + '"' + "0 0 " + str(Termination_date.day) + " " + str(Termination_date.month) + " " + str(Termination_date.weekday()+1) + " /bin/sh " + script_path + '"' + ") | sort - | uniq - | crontab -"
os.popen(cron)



#Server Health Log
final_health = "Fair (76%)"
report = "Team ID: " + teamID + " || Start Date: " + str(start_date) + " || End Date: " + str(end_date) + " || Server ID: " + str(server_id) + " || Initial Health: " + initial_health + " || Final Health: " + final_health + "\n"
file1 = open("server_health.txt","a")
file1.write(report)
file1.close()