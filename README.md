# Diary

> Diary is an online journal where users can pen down their thoughts and feelings. 



## Links
- UI Templates can be found [here](http://blessberry.github.io/diary.git/)
- This project is managed with Pivotal Tracker [here](https://www.pivotaltracker.com/n/projects/2406365)

# Features

## Core Features
- User can sign up.
- User can sign in.
- User can post an entry.
- User can update his/her entry.
- User can view a specific entry.
- User can view all of his/her entries.
- Admin can delete an entry.
- Admin can view all posted entries.

## Extra Features

- User can reset password.
- User can get daily notifications


## Endpoint:
1. Run the application , head to postman and test against the endpoints provided below.

 ```bash
    http://localhost:5000/api/v1/<endpoint>
```
Authentication
----------------- |

Method        | EndPoint      | Enable a user: |
------------- | ------------- | ---------------
POST  | /auth/signup  | Register to the platform  |
POST  | /auth/signin  | Login to the platform |


entries                                                	Admin
------------- |											------------- |

Method        | EndPoint      | Enable a user: |		Method        | EndPoint      | Enable a user: |
------------- | ------------- | ---------------			------------- | ------------- | ---------------
POST  | /entries  | Create an entry   |					POST  | /entries | Create an entry |
PATCH | /entries/<entry_id>  | Update the entry |		PATCH  | /entries | Update entries |
GET | /entries/<entry_id>  | Get the entry details |	GET  | /entries | Get entries |
DELETE | /entries/<entry_id>  | delete the entry |		DELETE | /entries/  | delete the entries |


General													Admin
------------- |											------------- |

Method        | EndPoint      | Enable a user: |		Method        | EndPoint      | Enable a user: |
------------- | ------------- | ---------------			------------- | ------------- | ---------------
GET  | /entries/<entry_id>  | View a specific entry |	GET  | /entries  | View all entries |
GET  | /entries/  | View a all available entries |		DELETE | /entries/<entry_id>  | Delete a particular entry |

---

## Author
- [Beraka Emmanuel](https://github.com/blessberry)