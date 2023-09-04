package it.vitalegi.jarg.account.service;

import it.vitalegi.jarg.account.entity.AccountEntity;
import it.vitalegi.jarg.account.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    AccountRepository accountRepository;

    public Integer getAccountId(String username) {
        var account = accountRepository.findByUsername(username);
        if (account == null) {
            return null;
        }
        return account.getAccountId();
    }

    public Integer addAccount(String username) {
        var entity = new AccountEntity();
        entity.setUsername(username);
        entity = accountRepository.save(entity);
        return entity.getAccountId();
    }
}
