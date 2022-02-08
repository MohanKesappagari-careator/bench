
use bench;
set foreign_key_checks = 0;
  truncate table status;
  truncate table user;
  truncate table role;
  truncate table resource;
  truncate table user_role;

insert into role(role,description)
VALUES
("AD","admin"),
("AM","account-manger"),
("RM","resource-manger"),
("HR","human-manger"),
("L","leader");


insert into status(statuscode, status)
values
  ('V', 'Available'),
  ('A','Allocate'),
  ('B','Blocked'),
  ('L','Leave');
