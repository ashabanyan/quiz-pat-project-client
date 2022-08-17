import { IQuizInfoRequest, IQuizQuestionItem, IQuizQuestions, IQuizQuestionsValues, IQuizRequest, IQuizRoundsValues, IQuizRounds, IQuizInfoWithCoverId } from "../types/quiz";

const test = {
    "quizInfoReq": {
        "name": "Тестовый квиз",
        "category_id": 1,
        "level_id": 2,
        "cover_id": 34
    },
    "quizRound": {
        "roundCount": 2,
        "rounds": [
            {
                "id": 0,
                "name": "Первый раунд"
            },
            {
                "id": 1,
                "name": "Второй раунд"
            }
        ]
    },
    "quizQuestions": {
        "roundsQuestions": [
            {
                "roundId": 0,
                "questionsCount": 2,
                "questions": [
                    {
                        "id": 0,
                        "question": "Раунд 1 Вопрос 1",
                        "answer": "Раунд 1 Ответ 1"
                    },
                    {
                        "id": 1,
                        "question": "Раунд 1 Вопрос 2",
                        "answer": "Раунд 1 Ответ 2"
                    }
                ]
            },
            {
                "roundId": 1,
                "questionsCount": 2,
                "questions": [
                    {
                        "id": 0,
                        "question": "Раунд 2 Вопрос 1",
                        "answer": "Раунд 2 Ответ 1"
                    },
                    {
                        "id": 1,
                        "question": "Раунд 2 Вопрос 2",
                        "answer": "Раунд 2 Ответ 2"
                    }
                ]
            }
        ]
    }
}

const { quizInfoReq, quizRound, quizQuestions } = test

// 
export const modifyQuizObject = (quizInfoReq: IQuizInfoWithCoverId, quizRound: IQuizRoundsValues, quizQuestions: IQuizQuestionsValues): IQuizRequest => {

// const modifyQuizObject = (quizInfoReq: IQuizInfoRequest, quizRound: IQuizRoundsValues, quizQuestions: IQuizQuestionsValues): IQuizRequest => {
    const roundCount = quizRound.roundCount

    const rounds  = quizRound.rounds.map(round => {
      const questionsRound: IQuizRounds = 
        quizQuestions.roundsQuestions
          .find(question => round.id === question.roundId && question)
  
      return {...questionsRound, name: round.name}
    })

  
    return {
        quizInfo: {
          ...quizInfoReq,
          roundCount
        },
        quizRound: rounds
    }

}