<!-- Mapa das features do sistema que ainda precisamos implementar -->

# Recuperação de Senha

**(RF) Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuario deve receber um email com instruções de recuperação de senha
- O usuário deve poder resetar sua senha

**(RNF) Requisitos Não Funcionais**

- Utilizar Mailtrap para testar envios em ambientes de desenvolvimento
- Utilizar Amazon SES (Simple Email Service) para envios em produção
- O envio de emails deve acontecer em segundo plano (background job)

**(RN) Regras de Negócio**

- O link enviado por email para resetar senha deve expirar em 1h;
- O usuário precisa confirmar a nova senha ao resetar sua senha


# Atualização do Perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha

**RN**

- O usuário não pode alterar seu email para um email já utilizado
- Para atualizar sua senha, o usuário deve informar a senha antiga
- Para atualizar sua senha, o usuário precisa confirmar a nova senha

# Painel do prestador (listagem de agendamentos)

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados no cache
- As notificações do prestador devem ser armazanadas no MongoDB
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io (protocolo como o http para comunicar frontend e backend em tempo real, sem atualizar tela)

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar

# Agendamento de Serviços

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador de serviço
- O usuário deve poder listar horários disponíveis em um dia especifico de um prestador
- O usuário deve poder realizar um novo agendamento com um prestador

**RNF**

- A listagem de prestadores deve ser armazenada em cache (para não ser carregada toda vez e onerar o sitema)


**RN**

- Cada agendamento deve durar 1h exatamente
- Os agendamentos devem estar disponíveis das 8h às 18h 
- O usuário não pode agendar em um horário já ocupado
- O usuário não pode agendar em um horário que já passou
- O usuário não pode agenar serviços consigo mesmos
