// Fonction pour afficher le QCM
function afficherQuiz() {

    document.getElementById("boutonCommencer").style.display = "none";

    // Tableau contenant les questions, choix de réponses et la bonne réponse
    const quiz = [
      // Niveau 1 – Bases
      {
        question: "Que signifie 'JS' ?",
        options: ["Java Syntax", "JavaScript", "JustStyle"],
        correct: 1
      },
      {
        question: "Quel mot-clé permet de créer une variable ?",
        options: ["let", "int", "define"],
        correct: 0
      },
      {
        question: "Que fait console.log() ?",
        options: ["Efface l'écran", "Affiche un message dans la console", "Crée une boîte de dialogue"],
        correct: 1
      },
      {
        question: "Comment crée-t-on une boîte de dialogue utilisateur ?",
        options: ["popup()", "alert()", "notify()"],
        correct: 1
      },
      {
        question: "prompt() permet de :",
        options: ["Afficher une alerte", "Demander une saisie utilisateur", "Écrire dans la console"],
        correct: 1
      },
      {
        question: "Quel forme de variable est il preferable de ne pas utiliser en JS ?",
        options: ["var", "let", "const"],
        correct: 0
      },
      // Niveau 2 – Types, opérateurs et conditions
      {
        question: "typeof 42 retourne :",
        options: ["'number'", "'string'", "'integer'"],
        correct: 0
      },
      {
        question: "== et === ont quelle différence ?",
        options: [
          "Aucune",
          "=== compare valeur et type, == compare juste la valeur",
          "== compare valeur et type, === ne compare que le type"
        ],
        correct: 1
      },
      {
        question: "Quel opérateur donne le reste d'une division ?",
        options: ["%", "/", "*"],
        correct: 0
      },
      {
        question: "Que signifie NaN ?",
        options: ["Nom automatique numérique", "Non applicable", "Not a Number"],
        correct: 2
      },
      {
        question: "isNaN('abc') renvoie :",
        options: ["true", "false", "undefined"],
        correct: 0
      },

      // Niveau 3 – Structures de contrôle
      {
        question: "Quel mot-clé permet une boucle ?",
        options: ["repeat", "while", "during"],
        correct: 1
      },
      {
        question: "Quel est le rôle du break dans une boucle ?",
        options: ["Lancer une exception", "Passer à l'itération suivante", "Sortir de la boucle"],
        correct: 2
      },
      {
        question: "switch(true) permet :",
        options: [
          "D'évaluer des booléens dans les case",
          "De créer une variable booléenne",
          "D'arrêter un switch automatiquement"
        ],
        correct: 0
      },
      {
        question: "Quelle boucle est utilisée dans le jeu du nombre mystère ?",
        options: ["for", "while", "do...while"],
        correct: 2
      },
      {
        question: "Pourquoi utilise-t-on Number(prompt(...)) ?",
        options: [
          "Pour vérifier si l’utilisateur a cliqué sur OK",
          "Pour convertir une chaîne en nombre",
          "Pour forcer la saisie d’un entier positif"
        ],
        correct: 1
      },

      // Niveau 4 – DOM et manipulation avancée
      {
        question: "Que fait innerHTML ?",
        options: [
          "Il modifie la balise head",
          "Il affiche un tableau HTML",
          "Il injecte du HTML dans un élément de la page"
        ],
        correct: 2
      },
      {
        question: "document.getElementById('resultats') renvoie :",
        options: ["Une liste de tous les éléments", "Le premier élément avec l’ID 'resultats'", "Une fonction nommée resultats"],
        correct: 1
      },
      {
        question: "Math.floor(Math.random()*10)+1 donne :",
        options: [
          "Un entier entre 0 et 10",
          "Un entier entre 1 et 10",
          "Un nombre décimal entre 1 et 10"
        ],
        correct: 1
      },
      {
        question: "Quelle structure permet d’exécuter un bloc uniquement si une condition est vraie ?",
        options: ["try", "else", "if"],
        correct: 2
      },
      {
        question: "Que se passe-t-il si on oublie break dans un switch ?",
        options: [
          "Il passe à la case suivante automatiquement",
          "Il affiche une erreur",
          "Il revient au début du switch"
        ],
        correct: 0
      }
    ];

    // Construction du HTML pour afficher les questions
    let quizHTML = `<h3>📋 Quizz JavaScript</h3><form id="qcmForm">`;

    // On parcourt chaque question du quiz
    quiz.forEach((q, i) => {
      quizHTML += `
        <div class="question">
          <p>${i + 1}. ${q.question}</p>
          <select name="q${i}">
            ${q.options.map((opt, j) => `<option value="${j}">${opt}</option>`).join("")}
          </select>
        </div>
      `;
    });

    // Ajout du bouton de validation
    quizHTML += `<button type="button" onclick="validerQuiz()">Valider les réponses</button></form><div id="corrections"></div>`;

    // Affichage dans la page
    document.getElementById("quiz").innerHTML = quizHTML;
  }

  // Fonction pour corriger les réponses et afficher le score
  function validerQuiz() {
    // On récupère tous les éléments select dans le formulaire
    const selects = document.querySelectorAll("#qcmForm select");
  
    let score = 0; // compteur de bonnes réponses
  
    // On récupère le tableau des bonnes réponses depuis afficherQuiz (on recrée ici uniquement les indices corrects)
    const bonnesReponses = [
      1, 0, 1, 1, 1, 0, // niveau 1
      0, 1, 0, 2, 0,    // niveau 2
      1, 2, 0, 2, 1,    // niveau 3
      2, 1, 1, 2        // niveau 4
    ];
  
    // On vérifie chaque réponse de l'utilisateur
    selects.forEach((select, i) => {
      const userAnswer = parseInt(select.value);
      if (userAnswer === bonnesReponses[i]) {
        score++;
      }
    });
  
    // Création du message selon le score obtenu
    let message = "";
  
    if (score <= 4) {
      message = `Tu n'as que ${score}/20... As-tu demandé à ta mamie de répondre à ta place ? 🤔`;
    } else if (score <= 8) {
      message = `${score}/20. Tu as fait la moitié du chemin... mais dans le mauvais sens 😅`;
    } else if (score <= 13) {
      message = `${score}/20. Tu tiens debout sur tes bases, maintenant faut les renforcer 🛠️`;
    } else if (score <= 17) {
      message = `${score}/20. Solide ! Encore un petit effort et tu deviens maître Jedi JS ⚔️`;
    } else if (score <= 19) {
      message = `${score}/20. Tu frôles la perfection… un bug t'a sûrement échappé 🤏`;
    } else {
      message = `20/20. Tu es JavaScript incarné. Même Brendan Eich (inventeur du JS) serait impressionné 😎`;
    }
  
    // Affichage du message final
    const correctionHTML = `<h4>Résultat final :</h4><p><strong>${message}</strong></p>`;
    document.getElementById("corrections").innerHTML = correctionHTML;
  }

  // Fonction principale déclenchée quand l'utilisateur clique sur "Commencer"
  function demarrerScript() {
    let output = ""; // Chaîne HTML pour afficher les résultats
    let prenom = prompt("Bonjour ! Quel est ton prénom ?"); // On demande le prénom
    let nom = prompt("Quel est ton nom ?");
    output += `<h3>Bienvenue, ${prenom} ${nom} 👋</h3>`; // On l'affiche dans la page

    // On demande deux nombres à l'utilisateur
    let n1 = Number(prompt("Entre un premier nombre :"));
    let n2 = Number(prompt("Entre un deuxième nombre :"));

    // Vérifie que l'utilisateur a bien entré des nombres valides
    if (isNaN(n1) || isNaN(n2)) {
      alert("Tu n'as pas entré des nombres valides !");
      return; // On arrête le script si ce n'est pas valide
    }

    // On affiche les opérations de base
    output += `<p><strong>Voici les résultats des opérations sur ${n1} et ${n2} :</strong></p>`;
    output += `
      <p>${n1} + ${n2} = ${n1 + n2}</p>
      <p>${n1} - ${n2} = ${n1 - n2}</p>
      <p>${n1} * ${n2} = ${n1 * n2}</p>
      <p>${n1} / ${n2} = ${n1 / n2}</p>
      <p>${n1} % ${n2} = ${n1 % n2}</p>`;

    // --- Petit jeu du nombre mystère ---
    let secret = Math.floor(Math.random() * 10) + 1; // Nombre aléatoire entre 1 et 10
    let guess, tentative = 0;

    alert("Je pense à un nombre entre 1 et 10. Peux-tu le deviner ?");
    // On boucle jusqu'à ce que l'utilisateur trouve le bon nombre
    do {
      guess = Number(prompt("Entre ton essai :"));
      tentative++;

      if (guess < secret) {
        alert("C'est plus !");
      } else if (guess > secret) {
        alert("C'est moins !");
      } else if (guess === secret) {
        alert(`Bravo ${prenom} ! Tu as trouvé le nombre ${secret} en ${tentative} essai(s) 🎉`);
        output += `<p><strong>Tu as trouvé le nombre mystère ${secret} en ${tentative} essai(s) !</strong></p>
                   <p>Essayez de reproduire cette page par vos propres moyen, Si vous le pouvez...</p> `;
      } else {
        alert("Ce n'est pas un nombre valide !");
      }
    } while (guess !== secret); // Boucle tant que la réponse est incorrecte

    // Affichage des résultats dans le bloc HTML
    document.getElementById("resultats").innerHTML = output;

    // On lance l'affichage du QCM
    afficherQuiz();
  }
  // scripte alternatif avec une l'utilisation de switch a la place des if/else if
  //function demarrerScript() {
  //  let output = "";
  //  let prenom = prompt("Bonjour ! Quel est ton prénom ?");
  //  output += `<h3>Bienvenue, ${prenom} 👋</h3>`;
  //
  //  let n1 = Number(prompt("Entre un premier nombre :"));
  //  let n2 = Number(prompt("Entre un deuxième nombre :"));
  //
  //  if (isNaN(n1) || isNaN(n2)) {
  //    alert("Tu n'as pas entré des nombres valides !");
  //    return;
  //  }
  //
  //  output += `<p><strong>Voici les résultats des opérations sur ${n1} et ${n2} :</strong></p>`;
  //  output += `<ul>
  //    <li>${n1} + ${n2} = ${n1 + n2}</li>
  //    <li>${n1} - ${n2} = ${n1 - n2}</li>
  //    <li>${n1} * ${n2} = ${n1 * n2}</li>
  //    <li>${n1} / ${n2} = ${n1 / n2}</li>
  //    <li>${n1} % ${n2} = ${n1 % n2}</li>
  //  </ul>`;
  //
  //  // Partie avec le switch : jeu du nombre mystère
  //  let secret = Math.floor(Math.random() * 10) + 1;
  //  let guess, tentative = 0;
  //
  //  alert("Je pense à un nombre entre 1 et 10. Peux-tu le deviner ?");
  //
  //  do {
  //    guess = Number(prompt("Entre ton essai :"));
  //    tentative++;
  //
  //    // On crée une différence entre la devinette et le nombre secret
  //    let difference = guess - secret;
  //
  //    // Le switch utilise true pour pouvoir évaluer plusieurs conditions
  //    switch (true) {
  //      case isNaN(guess):
  //        alert("Ce n'est pas un nombre valide !");
  //        break;
  //
  //      case difference < 0:
  //        alert("C'est plus !");
  //        break;
  //
  //      case difference > 0:
  //        alert("C'est moins !");
  //        break;
  //
  //      case difference === 0:
  //        alert(`Bravo ${prenom} ! Tu as trouvé le nombre ${secret} en ${tentative} essai(s) 🎉`);
  //                  output += `<p><strong>Tu as trouvé le nombre mystère ${secret} en ${tentative} essai(s) !</strong></p>
  //                             <p>Essayez de reproduire cette page par vos propres moyen, Si vous le pouvez...</p> `;
  //        break;
  //    }
  //
  //  } while (guess !== secret);
  //
  //  document.getElementById("resultats").innerHTML = output;
  //  afficherQuiz();
  //}