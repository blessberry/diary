# Diary

Diary is an online journal where users can pen down their thoughts and feelings.


> Diary is an online journal where users can pen down their thoughts and feelings. 

Diary is an online journal where users can pen down their thoughts and feelings.

Diary is an online journal where users can pen down their thoughts and feelings.



## Install and run the application:
First ensure that you have Nodejs and npm installed in your computer

1. Clone this repository and get to the project directory
```bash
    git clone https://github.com/blessberry/diary.git
    cd diary
    git checkout develop
```
2. Install the project dependencies
 ```bash
    npm install
```
4. Run the application:
 ```bash
    npm start
```


## Test the application:
```bash
    npm run test
```

## Test specific endpoint:
1. Run the application , head to postman and test against the endpoints provided below.

 ```bash
    http://localhost:5000/api/v1/<endpoint>
```
Authentication
------------- |

Method        | EndPoint      | Enable a user: |
------------- | ------------- | ---------------
POST  | /auth/signup  | Register to the platform  |
POST  | /auth/signin  | Login to the platform |



Entries
------------- |

Method        | EndPoint      | Enable a user: |
------------- | ------------- | ---------------
POST  | /entries  | Create an entry   |
PATCH | /entries/<entry_id>  | Update the entry |
GET | /entries/<entry_id>  | Get the entry details |
DELETE | /entries/<entry_id>  | delete the entry |

Admin
------------- |

Method        | EndPoint      | Enable a user: |
------------- | ------------- | ---------------
POST  | /entries | Create an entry |
PATCH  | /entries | Update entries |
GET  | /entries | Get entries |
DELETE | /entries/  | delete the entries |

General
------------- |

Method        | EndPoint      | Enable a user: |
------------- | ------------- | ---------------
GET  | /entries/<entry_id>  | View a specific entry |
GET  | /entries/  | View a all available entries |



Admin
------------- |

Method        | EndPoint      | Enable a user: |
------------- | ------------- | ---------------
GET  | /entries  | View all entries |
DELETE | /entries/<entry_id>  | Delete a particular entry |

---

