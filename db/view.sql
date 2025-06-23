CREATE OR REPLACE VIEW vw_scores_recente AS
SELECT c.nome, s.valor, s.data_calculo
FROM cadastros c
JOIN score s ON c.id = s.cadastro_id
WHERE s.data_calculo = (SELECT MAX(data_calculo) FROM score WHERE cadastro_id = c.id);
