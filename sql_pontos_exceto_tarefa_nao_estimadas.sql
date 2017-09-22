select  st.id as IDTarefa
        , st.nome as nomeItemSprintBacklog
        , p.nome as nomeProjeto
        , sb.sprint as NSprint
        
        from  Projeto p
        join Equipe e
        on p.id = e.projeto
        join Time t
        on e.time = t.id
        join Membro_Time mt
        on mt.time = t.id
        join Tarefa ta
        on ta.projeto = p.id
        join Sprint_Backlog sb
        on sb.item_backlog = ta.id
        join  Sprint_Tarefa st
        on sb.id = st.sprintBacklog
        join  Tipo_Contagem_ALI ali
        on ali.tarefa = st.id
		  left join  Tipo_Contagem_ee ee
        on ee.tarefa = st.id
		  left join  Tipo_Contagem_aie aie
        on aie.tarefa = st.id
         join  Tipo_Contagem_aie se
        on se.tarefa = st.id
         join  Tipo_Contagem_aie ce
        on ce.tarefa = st.id        
        where  mt.desenvolvedor = 5
			or ali.tarefa <> NULL and ee.tarefa <> NULL and aie.tarefa <> NULL and se.tarefa <> NULL or ce.tarefa <> NULL