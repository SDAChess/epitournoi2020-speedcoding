import React from "react";

export class HomePage extends React.Component {

    render() {
        return (
            <>
                <h2>Bienvenue sur l'épreuve de Speed Coding !</h2>

                Votre objectif durant ce jeu sera de trouver la réponse aux 4 problèmes qui vont seront présentés
                ! <br/>
                Pour cela, vous aurez un énoncé complet avec des exemples pour que vous puissiez bien comprendre le
                problème.
                S'il vous manque des informations ou que vous considérez que le sujet n'est pas assez clair sur un
                point,
                vous pouvez poser votre question dans le channel #speed-coding sur Discord. <br/>
                (Une réponse ne sera donnée que si le problème ne peut pas se résoudre sans !)

                <h2>Comment jouer ?</h2>
                <br/>
                Dans un premier temps, connectez vous dans l'onglet "Commencer !"
                <br/>
                Vous aurez alors accès à un terminal dont les commandes sont les suivantes :
                <ul>
                    <li> login email motdepasse -> Se connecter (Le lien pour modifier votre mot de passe vous a été
                        envoyé par mail).
                    </li>
                    <li> status -> Afficher votre statut pour la compétition (les problèmes résolus ou non, leur
                        cooldowns et votre temps restant).
                    </li>
                    <li> submit problème réponse -> Proposer une réponse pour un problème (Exemple : "submit 1 34"
                        enverra la réponse "34" au problème 1.
                    </li>
                    <li> open file -> Afficher un ficher (Exemple : "open problem1" affichera le problème 1.)</li>
                    <li> cd/ls -> Pour ceux qui savent à quoi elles correspondent, elles ont le même comportement. Vous
                        n'en aurez pas besoin !
                    </li>
                    <li> logout -> Se déconnecter (Vous n'aurez logiquement pas à utiliser cette commande. Si vous
                        veniez à la faire, vous pourrez vous reconnecter).
                    </li>
                </ul>
                Après vous être connecté, affichez les problèmes grâce à la commande open pour découvrir les défis !
                <br/>
                Il y a 4 problèmes : 1 facile, 2 moyens et 1 difficile.
                <br/>
                Vous aurez une heure pour tout résoudre.

                <h2>Classement</h2>
                Le premier à résoudre tous les problèmes sera premier, le deuxième deuxième, etc ...
                Pour ceux qui n'auront pas fini au bout d'une heure, le classement se fera de la sorte :
                <ul>
                    <li> Si deux joueurs n'ont pas fini les mêmes problèmes, celui qui a fini le plus dur gagne.</li>
                    <li> Si deux joueurs n'ont pas fini les mêmes problèmes et que les deux problèmes différents sont
                        les
                        moyens, celui qui a fini le moyen en premier gagne.
                    </li>
                    <li> Si deux joueurs ont fini les mêmes problèmes, celui qui a finit le plus dur en premier gagne.
                    </li>
                </ul>
                <h2>Pénalités</h2>
                Si vous vous trompez dans la réponse à un problème vous aurez un cooldown évolutif :
                <ul>
                    <li> 1, 2 ou 3 erreurs = 1 minute de cooldown.</li>
                    <li> 4 ou 5 erreurs = 5 minutes de cooldown.</li>
                    <li> 6 erreurs ou plus = 10 minutes de cooldown.</li>
                </ul>
                Il est conseillé d'avancer sur un autre problème pendant un cooldown.
                De plus, essayez les exemples proposés par le sujet pour être sur d'avoir la bonne réponse, ils sont là
                pour vous aider ! <br/>
                Vous pourrez voir le classement dans l'onglet "Scoreboard".<br/>
                Il sera actualisé en temps réél pendant l'épreuve.<br/>
                Bonne chance !
            </>
        );
    }
}