select * from projeto
select * from usuario
select * from tarefa

INSERT INTO "usuario" ("id", "email", "senha", "tipousuario") VALUES
	(991, 'lc.pg@hotmail.com', '123', '1'),
	(993, 'master@maste.com', '123', '2'),
	(994, 'master@master.com', '123', '2');
	
insert into projeto(id, usuario, nome, datacriacao) values (99999,'ola@ola', 'teste', now())
ALTER TABLE projeto ADD CONSTRAINT FK_A0559D942265B05D FOREIGN KEY (usuario) REFERENCES usuario (email) 
NOT DEFERRABLE INITIALLY IMMEDIATE

drop table usuario;
drop table projeto;

delete from usuario where id>4