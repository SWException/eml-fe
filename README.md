[![Build Status](https://travis-ci.com/SWException/eml-fe.svg?branch=develop)](https://travis-ci.com/SWException/eml-fe)

# Front-end dockerized

### Come usare il front-end tramite docker

*Per poter usare il front-end è necessario avere installato docker e docker compose nel proprio computer*

Per gli utenti Windows sarà sufficiente installare docker desktop

Per gli utenti Linux o simili sarà necessario installare sia docker sia docker-compose

Inoltre per poter eseguire eml-fe in hot-reload sarà necessario inserire in Settings/Resources/Filesharing la directory dove è presente la cartella eml-fe

## Lista di comandi importanti

La maggior parte dei comandi va eseguita nella directory che contiene il file **docker-compose.yaml**

| Descrizione   							| Comando 		|
| ------------- 							|:-------------:|
| Esecuzione con Build DEV                 	| **docker-compose -p EML-FE-DEV up -d --build EML-FE-DEV**	|
| Interruzzione di DEV      				| **docker-compose -p EML-FE-DEV down -v**	|
| Esecuzione con Build completa            	| **docker-compose -p EML-FE up -d --build EML-FE**	|
| Interruzzione di EML-FE-COMPLETA			| **docker-compose -p EML-FE down -v**	|
