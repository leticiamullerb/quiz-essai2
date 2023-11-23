# quiz-essai
Essai quizz numéro 2

Par rapport à l'autre quiz qui tenait la route, là j'ai rajouté un bouton submit et j'ai modifié la couleur du/des boutons sélectionnés. 
Mais ensuite j'ai essayé d'ajouter la possibilité de sélectionner plusieurs bonnes réponses + la correction de ces questions, ainsi que le feedback, mais j'ai fait tellement de changements que j'ai fini par me perdre. Ainsi, pour les singleChoice questions la réponse sélectionnée n'est plus prise en compte et donc pas corrigée. Et pour les questions à choix multiples, les réponses sélectionnées ne change pas de couleur mais le feedback fonctionne.

Enfin, même si aucune réponse n'est selectionnée, après le delayInMiliseconds de 2 secs, ça passe à la prochaine question sans attendre une nouvelle réponse. 

Les problèmes commencent à partir de la ligne 200. 
