import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const feedbackRepository = { create: jest.fn() }
const mailAdapter = { sendMail: jest.fn() }

describe('submit feedback', () => {
  it('Should be able to submit feedback', async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      feedbackRepository,
      mailAdapter
    )

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,teste.jpg'
    })).resolves.not.toThrow()
  })

  it('Should not be able to submit feedback without type', async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      feedbackRepository,
      mailAdapter
    )

    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,asdksaj873bbsas7dteste.jpg'
    })).rejects.toThrow()
  })

  it('Should not be able to submit feedback without comment', async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      feedbackRepository,
      mailAdapter
    )

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,asdksaj873bbsas7dteste.jpg'
    })).rejects.toThrow()
  })

  it('Should not be able to submit feedback with an invalid screenshot', async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      feedbackRepository,
      mailAdapter
    )

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'invalid screenshot example',
      screenshot: 'teste.jpg'
    })).rejects.toThrow()
  })

  it('Should be able to submit feedback with the create function', async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      feedbackRepository,
      mailAdapter
    )

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'correct screenshot example',
      screenshot: 'data:image/png;base64,asdksaj873bbsas7dteste.jpg'
    })).resolves.not.toThrow()

    expect(feedbackRepository.create).toHaveBeenCalled();
  })

  it('Should be able to submit feedback with one or more email send called', async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      feedbackRepository,
      mailAdapter
    )

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'correct screenshot example',
      screenshot: 'data:image/png;base64,asdksaj873bbsas7dteste.jpg'
    })).resolves.not.toThrow()

    expect(mailAdapter.sendMail).toHaveBeenCalled();
  })
})