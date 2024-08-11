import { Token, TokkenType, User } from '@prisma/client'

import { TokenInterface } from '@/repositories/Prisma/tokens/token-interface'
import { UserInterface } from '@/repositories/Prisma/users/user-interface'

import { UsersNotFoundError } from '../errors/users-not-found-error'

interface RecoveryPasswordTokenUseCaseRequest {
  email: string
  type: TokkenType
}

interface RecoveryPasswordTokenUseCaseResponse {
  passwordToken: Token
  user: User
}

export class RecoveryPasswordTokenUseCase {
  constructor(
    private tokenRepository: TokenInterface,
    private userRepository: UserInterface,
  ) {}

  async execute({
    email,
    type,
  }: RecoveryPasswordTokenUseCaseRequest): Promise<RecoveryPasswordTokenUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UsersNotFoundError()
    }

    const passwordToken = await this.tokenRepository.create({
      userId: user.id,
      type,
    })

    // send email with password recover link

    // const transporter = nodemailer.createTransport({
    //   service: 'gmail', // replace with your email service
    //   auth: {
    //     user: 'your-email@gmail.com', // replace with your email address
    //     pass: 'your-email-password', // replace with your email password
    //   },
    // });

    // const mailOptions = {
    //   from: 'your-email@gmail.com', // replace with your email address
    //   to: email,
    //   subject: 'Password Recovery',
    //   text: `Click the following link to reset your password: http://your-app-url/reset-password/${token.id}`,
    // };

    // await transporter.sendMail(mailOptions);

    return {
      passwordToken,
      user,
    }
  }
}
