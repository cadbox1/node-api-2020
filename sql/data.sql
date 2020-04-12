INSERT INTO public.task(id, name) VALUES 
    (1, 'setup project'),
    (2, 'work some stuff out'),
    (3, 'cleanup'),
    (4, 'documentation'),
    (5, 'push');

SELECT pg_catalog.setval(pg_get_serial_sequence('public.task', 'id'), MAX(id)) FROM task;

INSERT INTO public.task(id, name) VALUES 
    (1, 'fun'),
    (2, 'important'),
    (3, 'easy');

SELECT pg_catalog.setval(pg_get_serial_sequence('public.tag', 'id'), MAX(id)) FROM tag;

INSERT INTO public.task_tag(task_id, tag_id) VALUES 
    (2, 1),
    (1, 2),
    (2, 2),
    (3, 2),
    (4, 2),
    (5, 2),
    (5, 3);
